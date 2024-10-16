"use client"

import React from "react"
import { NextPage } from "next"

const ServerErrorPage: NextPage = () => {
    return (
        <section className="v-error-section v-section-padding">
            <div className="v-error-content">
                <div className="v-error-image">
                    <img src={"/images/500.svg"} alt="500 image" />
                </div>
                <div className="v-text-body">
                    <h1>Internal server error</h1>
                    <p>Sorry, but the page you were looking for could not be found</p>
                </div>
            </div>
        </section>
    )
}

export default ServerErrorPage
