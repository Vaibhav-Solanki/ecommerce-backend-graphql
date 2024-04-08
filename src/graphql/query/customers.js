export const name = 'customers';

export const auth = false;

export async function resolver(parent, args, contextValue) {
  const {dal} = contextValue.context

  const repo = await dal.getRepo('customers')


  return await repo.findAll();
}
