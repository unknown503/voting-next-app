import { Pie, Column } from '@ant-design/plots';
import { useMemo } from 'react';
import styles from '../../styles/Results.module.scss'
import { ColumnConfig, PieConfig } from './Configs';

interface IResults {
    candidates: ICandidates[],
    vote: string | null
}

export default function Results({ candidates, vote }: IResults) {

    const ColumnData = useMemo(() => {
        return candidates.map(c => {
            delete c.data.image
            return {
                type: c.data.full_name,
                sales: c.data.votes
            }
        })
    }, [candidates])

    const PieData = useMemo(() => {
        return candidates.map(c => {
            delete c.data.image
            return {
                type: c.data.full_name,
                value: c.data.votes
            }
        })
    }, [candidates])

    return (
        <div className={styles.results}>
            <h2>Resultados actuales</h2>
            <span className={styles.vote}>Votaste por: {candidates.filter(c => c.id === vote)[0].data.full_name}</span>
            <div className={styles.charts}>
                <Column {...ColumnConfig(ColumnData)} />
                <Pie {...PieConfig(PieData)} />
            </div>
        </div>
    )
}
