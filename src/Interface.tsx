
type prevNext = number | null;


export interface results {
    results: charactersResults[]
}
export interface charactersResults {
    id: any,
    name: string,
    gender: string,
    status: string,
    image: string
}

export interface information {
    next: prevNext,
    prev: prevNext,
    pages: number,
}

export interface characters {
    characters: results,
    info: information,
}