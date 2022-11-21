export const ColumnConfig = (data: any) => {
    return {
        data,
        xField: 'type',
        yField: 'sales',
        columnWidthRatio: 0.8,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: '类别',
            },
            sales: {
                alias: 'Votos',
            },
        },
    }
}

export const PieConfig = (data: any) => {
    return {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ]
    }
}