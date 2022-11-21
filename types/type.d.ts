interface IUserState {
    id: string,
    name: string,
    vote: string | null,
}

interface ICandidates {
    data: DocumentData,
    id: string
}