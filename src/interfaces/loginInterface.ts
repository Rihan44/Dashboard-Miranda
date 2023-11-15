interface LoginInterface {
	user?: string
	email?: string
	password?: string
	userPhoto?: string
	payload?: any 
	token?: string
}

interface LoginInterfaceState {
	data: LoginInterface,
	status: string,
    error: string | null | undefined
}