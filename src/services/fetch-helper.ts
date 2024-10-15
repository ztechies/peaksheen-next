"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { config } from "@/utils/constants"
import { iterateObject } from "@/utils/handle-error"
import { addressService, applicationService, axiosInstance, contentService } from "./axios-instance"

export type Params = Record<string, any>

const parseResponse = async (response: Response) => {
    if (response.status == config.STATUS_CODES.NO_CONTENT) {
        return null
    } else if (!response.ok) {
        const json = await response.json()
        throw new Error(parseResponseError(json))
    }
    try {
        return await response.json()
    } catch (error) {
        return null
    }
}
/**
 * Extracts and constructs an error message from a response object.
 *
 * This function iterates over the response object and constructs an error message.
 *
 * @param response - The response object containing error information.
 * @returns The constructed error message.
 */
export const parseResponseError = (response: Response) => {
    const errorMessage = iterateObject(response)
    return errorMessage
}

/**
 * Appends query parameters to a URL.
 *
 * This function creates a new URL object based on the provided URL and appends the given
 * query parameters. Existing query parameters are cleared before appending the new ones.
 *
 * @param url - The base URL to which the parameters will be appended.
 * @param params - An optional object containing key-value pairs of parameters to append.
 * @returns A new URL object with the appended query parameters.
 */
const appendParams = (url: URL, params?: Record<string, any>): URL => {
    const newUrl = new URL(url.href)
    if (params && Object.keys(params).length) {
        newUrl.searchParams.forEach((_, key) => {
            newUrl.searchParams.delete(key)
        })
        Object.entries(params).forEach(([key, value]) => {
            newUrl.searchParams.set(key, value)
        })
    }
    return newUrl
}

/**
 * Helper object for making various HTTP requests with automatic token refreshing.
 */
export const FetchHelper = {
    /**
     * Performs a GET request.
     * @async
     * @function get
     * @memberof FetchHelper
     * @param {URL} url The URL to fetch.
     * @param {Params} [params] Optional parameters to append to the URL query string.
     * @returns {Promise<any>} A promise resolving to the response data.
     */
    get: async (url: URL, params?: Params): Promise<any> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "GET" })
    },
    /**
     * Performs a POST request.
     * @async
     * @function post
     * @memberof FetchHelper
     * @param {URL} url The URL to fetch.
     * @param {object} data The data to send in the request body.
     * @param {Params} [params] Optional parameters to append to the URL query string.
     * @returns {Promise<any>} A promise resolving to the response data.
     */
    post: async (url: URL, data: object, params?: Params): Promise<any> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "POST", data })
    },
    /**
     * Performs a PUT request.
     * @async
     * @function put
     * @memberof FetchHelper
     * @param {URL} url The URL to fetch.
     * @param {object} data The data to send in the request body.
     * @param {Params} [params] Optional parameters to append to the URL query string.
     * @returns {Promise<any>} A promise resolving to the response data.
     */
    put: async (url: URL, data: object, params?: Params): Promise<any> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "PUT", data })
    },
    /**
     * Performs a PATCH request.
     * @async
     * @function patch
     * @memberof FetchHelper
     * @param {URL} url The URL to fetch.
     * @param {object} data The data to send in the request body.
     * @param {Params} [params] Optional parameters to append to the URL query string.
     * @returns {Promise<any>} A promise resolving to the response data.
     */
    patch: async (url: URL, data: object, params?: Params): Promise<any> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "PATCH", data })
    },
    /**
     * Performs a DELETE request.
     * @async
     * @function delete
     * @memberof FetchHelper
     * @param {URL} url The URL to fetch.
     * @param {Params} [params] Optional parameters to append to the URL query string.
     * @returns {Promise<any>} A promise resolving to the response data.
     */
    delete: async (url: URL, params?: Params): Promise<any> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "DELETE" })
    },

    /**
     * Uploads file data using a PUT request.
     * @async
     * @function putFileData
     * @memberof FetchHelper
     * @param {URL} url The URL to upload the file to.
     * @param {any} data The data to send in the request body (file content).
     * @param {string} contentType The content type of the file data.
     * @returns {Promise<any>} A promise resolving to the parsed response data.
     */
    putFileData: async (url: URL, data: any, contentType: string) => {
        return await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": contentType,
            },
            body: data,
        }).then(parseResponse)
        // no need for catch here as we don't want to swallow errors
    },
}

/**
 * Performs a POST request.
 * @async
 * @function post
 * @param {String} postCode
 * @param {String} API_KEY
 * @returns {Promise<any>} A promise resolving to the response data.
 */
export const findAddressService = async (postcode: string, API_KEY = config.GOOGLE_API.API_KEY) => {
    const response = await addressService.get(
        `/maps/api/geocode/json?address=${postcode}&key=${API_KEY}`,
    )
    return response.data
}

/**
 * Performs a POST request.
 * @async
 * @function post
 * @param {object} data The data to send in the request body.
 * @returns {Promise<any>} A promise resolving to the response data.
 */
export const submitApplication = async (data: FormData) => {
    try {
        const response = await applicationService.post(`/api/new-cleaner-application`, data)
        if (response) {
            return response.data
        }
    } catch (error: any) {
        if (error.response) {
            const errorData = error.response.data.errors
            if (error.response.status === 400) {
                if (errorData.email) {
                    return { errorType: "email", message: errorData.email[0] }
                }
                return { errorType: "validation", message: errorData || "Validation failed" }
            } else if (error.response.status === 500) {
                return { errorType: "server", message: "Something went wrong" }
            }
            return {
                errorType: "unknown",
                message: `Error: ${errorData?.message || "Unknown error occurred"}`,
            }
        } else {
            return {
                errorType: "network",
                message: "Request failed. Please check your connection and try again.",
            }
        }
    }
}

/**
 * Performs a GET request.
 * @async
 * @function get
 * @returns {Promise<any>} A promise resolving to the response data.
 */
export const getContent = async () => {
    const response = await contentService.get("/api/content-management")
    return response.data
}
