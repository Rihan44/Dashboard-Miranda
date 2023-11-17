export interface ContactInterface {
    _id?: string | undefined,
    name: string,
    email: string,
    phone: string | number,
    email_subject: string,
    email_description: string,
    dateTime: string,
    isArchived: boolean
}

export interface ContactInterfaceState {
    data: ContactInterface[],
    status: string,
    statusArchive: string,
    error: string | null | undefined
}

