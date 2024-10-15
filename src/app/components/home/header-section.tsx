const HeaderSection = () => {
    return (
        <section className="container-fluid header-section position-relative">
            <div className="header-background"></div>
            <div className="header-content text-center text-white d-flex flex-column justify-content-center align-items-center">
                <h1 className="header-heading">
                    Reliable House
                    <span className="header-sub-heading"> Cleaning!</span>
                </h1>
                <div className="position-relative header-form-parent  mt-4">
                    <form
                        className="header-form d-flex flex-column flex-md-row align-items-center"
                        action="/cleaners-availability"
                    >
                        <input
                            className="form-control me-md-2 mb-2 mb-md-0"
                            placeholder="Enter your postcode"
                            type="number"
                            name="postal_code"
                            onKeyDown={(e) => {
                                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                                    e.preventDefault()
                                }
                            }}
                        />
                        <input
                            type="email"
                            className="form-control me-md-2 mb-2 mb-md-0"
                            placeholder="Email"
                            name="email"
                        />
                        <button type="submit" className="btn button-global">
                            Make a booking
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default HeaderSection
