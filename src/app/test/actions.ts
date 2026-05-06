'use server'

import { createTag, updateTag, deleteTag } from '@/lib/tags'
import { revalidatePath } from 'next/cache'

export async function createTestTagAction() {
  await createTag('Test Tag', 'test-tag-service-role')
  revalidatePath('/test')
}

export async function updateTestTagAction() {
  await updateTag(
    '4210ea9b-b058-4b9b-896a-015cc293c42b',
    'updated-slug',
    'updated-name',
  )
  revalidatePath('/test')
}

export async function deleteTestTagAction() {
  await deleteTag('4210ea9b-b058-4b9b-896a-015cc293c42b')
  revalidatePath('/test')
}
