import { Header } from "./Header"
import { Menu } from "./Menu"


export const Dashboard = () => {
    return(
        <>
            <Header title="Dashboard" />
            <Menu/>
            <main>
                <p>Dashboard</p>
            </main>
        </>
    )
}