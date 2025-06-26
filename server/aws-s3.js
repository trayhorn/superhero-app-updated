import {
	S3,
	ListObjectsCommand,
	PutObjectCommand,
	GetObjectCommand,
	DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from 'fs/promises';

const s3client = new S3({
	region: "eu-central-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

const bucketName = "superheroes-bucket-12314323543";

export const deleteFilesOnEdit = async (keysArray) => {
	const deleteObjectsCommand = new DeleteObjectsCommand({
		Bucket: bucketName,
		Delete: { Objects: keysArray.map(el => ({Key: el})) },
	});

	await s3client.send(deleteObjectsCommand);
}

export const deleteFilesFromBucket = async (id) => {
  const listObjectsCommand = new ListObjectsCommand({ Bucket: bucketName });
  const { Contents } = await s3client.send(listObjectsCommand);

  const keys = Contents.filter(el => el.Key.includes(id));

  const deleteObjectsCommand = new DeleteObjectsCommand({
		Bucket: bucketName,
		Delete: { Objects: keys.map(el => ({ Key: el.Key })) },
  });

	await s3client.send(deleteObjectsCommand);
}

export const uploadFilesIntoBucket = async ({ key, filePath }) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: await fs.readFile(filePath),
  });

  await s3client.send(command);
};

export const getImageSignedUrl = async (key) => {
  const getImageCommand = new GetObjectCommand({
		Bucket: bucketName,
		Key: key,
	});

	const url = await getSignedUrl(s3client, getImageCommand, {
		expiresIn: 3600,
	});
	return url;
}