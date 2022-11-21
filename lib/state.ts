import { initialState, setUserState } from '../store/user/userSlice';
import { getUserInfo } from '../lib/firebase';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../store/store";
import { useSession } from 'next-auth/react';

const useSetUserState = async (status: string): Promise<void> => {
    try {
        const user = useSelector((state: RootState) => state.user)
        const dispatch = useDispatch()
        const { data: session } = useSession()

        if (status === "authenticated" && user === initialState) {
            const userSession = session?.user
            const id = userSession?.email

            if (id && userSession?.name) {
                const userRes = await getUserInfo(id)
                const userData = userRes.data()
                if (!userData) return

                const newState = {
                    id: id,
                    name: userSession.name,
                    vote: userData.vote
                }
                dispatch(setUserState(newState))
            }
        }
    } catch (error) {
        throw Error
    }
}
export default useSetUserState