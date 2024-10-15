export interface FormDataFieldType {
    name: string
    email: string
    postcode: string
    address: string
    cleaningExperienceYear: number
    cleaningExperienceMonth: number
    preferredHours: string
    dbs_check: string
    own_transport: string
    rights: string
    selectedDays: {
        value: string
        label: string
    }[]
    selectedAreas: {
        value: string
        label: string
    }[]
    certificateDate: Date
    mobileNumber: string
    cv: {
        0: File
        length: number
    }
}

export interface UploadOptions {
    bucketName: string
    folder: string
}

export interface S3FileType {
    buffer: ArrayBuffer | string | null
    fileName: string
}

export interface contentContextInterface {
    content: {
        landingPage_bg_img: string
        landingPage_heading: string
        landingPage_sub_heading: string
        landingPage_desc: string
        section_1_heading: string
        section_1_heading_desc: string
        section_1_blocks: {
            title: string
            description: string
        }[]
        section_2_img: string
        section_3_img: string
        section_4_img: string
        section_5_img: string
        about_us_content: string
        about_us_facebook_link: string
    } | null
    isLoading: boolean
}

export interface contentState {
    landingPage_bg_img: string
    landingPage_heading: string
    landingPage_sub_heading: string
    landingPage_desc: string
    section_1_heading: string
    section_1_heading_desc: string
    section_1_blocks: {
        title: string
        description: string
    }[]
    section_2_img: string
    section_3_img: string
    section_4_img: string
    section_5_img: string
    about_us_content: string
    about_us_facebook_link: string
}
