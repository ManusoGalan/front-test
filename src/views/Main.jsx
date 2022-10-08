import Header from "./components/Header"

const DefaultView = ({children}) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default DefaultView