import toast from "react-hot-toast"

/**
 * Generates an array of numbers from 1 to the specified length.
 *
 * @param {number} length - The length of the array to generate.
 * @returns {number[]} An array containing numbers from 1 up to the specified length.
 *
 * @example
 * Returns [1, 2, 3, 4, 5]
 * getArray(5);
 *
 * @example
 *  Returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * getArray(10);
 */
export const getArray = (length: number) => {
    return Array.from({ length }, (_, i) => i + 1)
}

export const calculatePoint = (formData: FormData): number => {
    let totalPoint = 0
    const pointsMap: { [key: string]: (val: FormDataEntryValue) => number } = {
        experience: (val) => (Number(val) / 12) * 0.2,
        dbs_check: (val) => (val === "yes" ? 10 : 0) * 0.15,
        own_transport: (val) => (val === "yes" ? 10 : 0) * 0.1,
        work_areas: (val) => {
            const numOfAreas = (val as string).split(",").length
            let points = 0
            if (numOfAreas >= 10) {
                points = 10
            } else {
                points = numOfAreas
            }
            return points * 0.2
        },
        preferred_hours: (val) => {
            const hours = Number(val)
            let points: number = 0
            if (hours === 30) {
                points = 10
            } else if (hours >= 1 && hours <= 5) {
                points = 1
            } else if (hours >= 6 && hours <= 10) {
                points = 2
            } else if (hours >= 11 && hours <= 15) {
                points = 4
            } else if (hours >= 16 && hours <= 20) {
                points = 6
            } else if (hours >= 21 && hours <= 25) {
                points = 8
            } else if (hours >= 26 && hours <= 29) {
                points = 9
            }
            return points * 0.2
        },
        right_to_work: (val) => {
            const workStatusPoints: { [key: string]: number } = {
                "UK Citizenship / UK Passport": 10,
                "Settled Status / Indefinite Leave to Remain": 10,
                "Work Visa": 5,
                "Skilled Worker Visa": 5,
                "Student Visa": 5,
                "Graduate Visa": 2,
                "Family Visa": 2,
            }
            return (workStatusPoints[val as string] || 0) * 0.15
        },
    }
    for (const [key, val] of Array.from(formData.entries())) {
        const calculatePoints = pointsMap[key]
        if (calculatePoints) {
            totalPoint += calculatePoints(val)
        }
    }
    return +totalPoint.toFixed(2)
}

// Handle failure
export const handleFailure = (message: string) => {
    toast.error(message)
}

export const formFieldValues = {
    daysList: [
        { value: "monday", label: "Monday" },
        { value: "tuesday", label: "Tuesday" },
        { value: "wednesday", label: "Wednesday" },
        { value: "thursday", label: "Thursday" },
        { value: "friday", label: "Friday" },
    ],
    nearestAreas: [
        { value: "manchester", label: "Manchester" },
        { value: "salford", label: "Salford" },
        { value: "stockport", label: "Stockport" },
        { value: "tameside", label: "Tameside" },
        { value: "bury", label: "Bury" },
        { value: "rochdale", label: "Rochdale" },
        { value: "oldham", label: "Oldham" },
        { value: "bolton", label: "Bolton" },
        { value: "wigan", label: "Wigan" },
    ],
    rightsArr: [
        "UK Citizenship / UK Passport",
        "Settled Status / Indefinite Leave to Remain",
        "Student Visa",
        "Graduate Visa",
        "Skilled Worker Visa",
        "Dependant Visa",
        "Family Visa",
        "Work Visa",
        "Business Visa",
        "Visitor Visa",
        "UK Transit Visa",
        "Other (not listed)",
    ],
}
