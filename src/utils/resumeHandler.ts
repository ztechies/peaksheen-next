import { S3FileType, UploadOptions } from "@/types/components/form"
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { config } from "./constants"

const s3 = new S3Client({
    region: config.AWS_S3.REGION,
    credentials: {
        accessKeyId: config.AWS_S3.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: config.AWS_S3.AWS_SECRET_ACCESS_KEY || "",
    },
})

/**
 * Performs a POST request.
 * @async
 * @function post
 * @param {S3FileType} file
 * @param {UploadOptions} options
 * @returns {Promise<any>} A promise resolving to the response data.
 */
export const uploadFileToS3 = async (file: S3FileType, options: UploadOptions) => {
    const { bucketName, folder } = options
    if (!file || !file.buffer) {
        throw new Error("Invalid file object: buffer is missing.")
    }
    const fileExtension = file.fileName.split(".").pop()
    const uniqueFileName = `${new Date().getTime()}.${fileExtension}`
    // Convert ArrayBuffer to Uint8Array if buffer is an ArrayBuffer
    const bodyContent = typeof file.buffer === "string" ? file.buffer : new Uint8Array(file.buffer)
    const params = {
        Bucket: bucketName,
        Key: `${folder}/${uniqueFileName}`,
        Body: bodyContent, // Uint8Array or string
        ContentType: "application/octet-stream",
    }
    // Handle the S3 upload
    try {
        const data = await s3.send(new PutObjectCommand(params))
        if (data["$metadata"].httpStatusCode === 200) {
            const fileUrl = `https://${bucketName}.s3.${config.AWS_S3.REGION}.amazonaws.com/${folder}/${uniqueFileName}`
            return {
                success: true,
                fileUrl,
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.name === "NetworkingError") {
            console.error("Network error:", error)
        } else if (error.name === "TimeoutError") {
            console.error("Request timed out:", error)
        } else {
            console.error("General error:", error)
        }
        throw new Error(`File upload failed: ${error.message}`)
    }
}

/**
 * Performs a DELETE request.
 * @async
 * @function DELETE
 * @param {String} fileUrl
 * @param {String} bucketName
 * @returns {Promise<boolean>} A promise resolving to the response data.
 */
export const deleteFileFromS3 = async (fileUrl: string, bucketName: string) => {
    try {
        // Extract the S3 key from the file URL
        const urlPattern = new RegExp(`https://${bucketName}.s3.[^/]+/(.+)`)
        const match = fileUrl.match(urlPattern)
        if (!match || !match[1]) {
            throw new Error("Invalid file URL provided.")
        }
        const fileKey = match[1]
        const params = {
            Bucket: bucketName,
            Key: fileKey,
        }
        // Attempt to delete the file from S3
        const data = await s3.send(new DeleteObjectCommand(params))
        if (data["$metadata"].httpStatusCode === 204) {
            return true
        } else {
            throw new Error("File deletion failed")
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("File deletion failed:", error.message)
        throw new Error(`Error deleting file from S3: ${error.message}`)
    }
}
