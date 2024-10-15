interface Item {
    title: string
    link: string
    id: number
}
const Breadcrumbs = (props: { items: Item[] }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {props.items.map((el) => (
                    <li className="breadcrumb-item" key={el.id}>
                        <a href={el.link}>{el.title}</a>
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default Breadcrumbs
