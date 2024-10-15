const ServiceHighlights = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="section-services py-md-5 py-lg-5 py-sm-2">
            <div className="container">{children}</div>
        </section>
    )
}

export default ServiceHighlights
