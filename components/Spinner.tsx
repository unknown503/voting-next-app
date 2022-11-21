import MoonLoader from "react-spinners/MoonLoader";

interface ISpinner {
    loading: boolean
}

export default function Spinner({ loading }: ISpinner) {
    return (
        <>
            <MoonLoader
                color="#0196e3"
                loading={loading}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </>
    )
}
