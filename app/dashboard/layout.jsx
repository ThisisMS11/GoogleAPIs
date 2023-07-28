import Search from "../../components/Search"
export default function DashboardLayout({ children }) {
    
    return (
        <section >
            <Search />
            {children}
        </section>
    )
}
