export const name = 'saveFile'

export const auth = true
export async function resolver (parent, args, contextValue, info) {
  const { context, user } = contextValue
  const { file } = args
  const customerId = user.identity.id

  const filesRepo = await context.dal.getRepo('files')

  if (!file.type.includes('image')) {
    throw new Error('Invalid file type')
  }

  const extension = file.name.split('.').pop()
  const fileName = `${context.uuid()}.${extension}`

  const fileArrayBuffer = await file.arrayBuffer()

  const res = await context.imagekit.upload({
    file: fileArrayBuffer, // required
    fileName // required
  })

  await filesRepo.insert({
    customer_id: customerId,
    file: fileName,
    file_type: res.fileType,
    url: res.url
  })

  return res.url
}
