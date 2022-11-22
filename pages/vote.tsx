import clsx from 'clsx'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getCandidates, setUserVoteFB, SubscribeToVotesChanges } from '../lib/firebase'
import styles from '../styles/Vote.module.scss'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../store/store";
import { setUserVote } from '../store/user/userSlice'
import useSetUserState from '../lib/state'
import Results from '../components/Results'
import Spinner from '../components/Spinner'


export default function vote() {
    const [Candidates, setCandidates] = useState<ICandidates[] | []>([])
    const [Vote, setVote] = useState<string | null>(null)
    const [Loading, setLoading] = useState<boolean>(true)

    const { data: session, status } = useSession()
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const setState = useSetUserState(status)

    const loadCandidates = async (): Promise<void> => {
        const res = await getCandidates()
        const candidates: ICandidates[] = []
        res.docs.map(doc => candidates.push({ data: doc.data(), id: doc.id }))
        setCandidates(candidates)
        setLoading(false)
    }

    const VoteHandler = async () => {
        try {
            if (Vote !== null && user.vote === null) {
                dispatch(setUserVote(Vote))
                await setUserVoteFB(Vote, user.id)
                const chosenCandidateName = Candidates.filter(candidate => candidate.id === Vote)[0].data.full_name
                toast.success("Votaste por " + chosenCandidateName)

                const updatedVote = Candidates.map(c => {
                    if (c.id === Vote) c.data.votes++
                    return c
                })
                setCandidates(updatedVote)
            }
        } catch (error: any) {
            toast.error(error)
        }
    }

    useEffect(() => {
        setState.catch(toast.error)
    }, [status])

    useEffect(() => {
        loadCandidates().catch(toast.error)
    }, [])

    useEffect(() => {
        const unsubscribe = SubscribeToVotesChanges(snapshot => {
            const changes = snapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }))
            setCandidates(changes)
        })

        return () => {
            unsubscribe()
        }
    }, [])


    return (
        <>
            <div className={styles.page}>
                <div className={styles.box}>
                    {
                        user.vote === null ?
                            <>
                                <h2>Elije un candidato</h2>
                                <span className={styles.username}>Votando como: {session?.user?.name}</span>
                                <div className={styles.candidates}>
                                    {
                                        Loading ?
                                            <div className={styles.spinner}>
                                                <Spinner loading={Loading} />
                                            </div>
                                            :
                                            Candidates.map(c => (
                                                <CandidateBox
                                                    currVote={Vote}
                                                    setVote={setVote}
                                                    key={c.id}
                                                    id={c.id}
                                                    pic={c.data.picture}
                                                    name={c.data.full_name}
                                                />
                                            ))
                                    }
                                </div>
                                <button className='btn' onClick={VoteHandler}>Votar</button>
                            </>
                            :
                            <>
                                {
                                    Candidates.length > 0 && <Results candidates={Candidates} vote={user.vote} />
                                }
                            </>
                    }
                </div>
            </div>
        </>
    )
}
interface ICandidatesProps {
    pic: string,
    name: string,
    id: string,
    setVote: Dispatch<SetStateAction<string | null>>
    currVote: string | null

}
const CandidateBox: FC<ICandidatesProps> = ({ id, pic, name, setVote, currVote }) => {
    const WasCandidateVoted = currVote === id
    const boxStyles = WasCandidateVoted ? clsx(styles.chosen, styles.candidate) : styles.candidate

    const voteHandler = () => {
        if (WasCandidateVoted) setVote(null)
        else setVote(id)
    }
    return <>
        <div className={boxStyles} onClick={voteHandler}>
            <div className={styles.candidateBox}>
                <Image priority={true} src={pic} alt={name} width={144} height={144} />
                <h3>{name}</h3>
            </div>
        </div>
    </>
}