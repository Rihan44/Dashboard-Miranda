export interface ContactInterface {
    id?: string | number,
    name: string,
    email: string,
    phone: string | number,
    email_subject: string,
    email_description: string,
    date: Date | string, 
    dateTime: Date | string,
    isArchived: boolean
}

export interface ContactInterfaceState {
    data: ContactInterface[],
    status: string,
    statusArchive: string,
    error: string | null | undefined
}

