image:
	@ yarn build
	@ rm -rf packages/be/cmd/be/kodata && mv packages/react-app/build kodata && mv kodata packages/be/cmd/be/kodata
	@ cd packages/be && gcloud builds submit --tag gcr.io/fit-stream-305821/scratch
