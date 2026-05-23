"use server";

import { revalidatePath } from 'next/cache';
import type { ActionResult, ArtworkFull } from '@/types/artwork';
import { validateArtworkInput } from '@/lib/validations/artwork';
import {
  createArtwork,
  updateArtwork,
  deleteArtwork,
  togglePublish,
} from '@/lib/db/artworks';
import { deleteImage } from '@/lib/cloudinary';

export async function createArtworkAction(
  data: Record<string, unknown>
): Promise<ActionResult<ArtworkFull>> {
  try {
    const validation = validateArtworkInput(data);
    if (!validation.success || !validation.data) {
      return { success: false, error: validation.errors.join(', ') };
    }

    const artwork = await createArtwork(validation.data);

    revalidatePath('/');
    revalidatePath('/collections');

    return { success: true, data: artwork };
  } catch (error) {
    console.error('Create artwork error:', error);
    return { success: false, error: 'Failed to create artwork' };
  }
}

export async function updateArtworkAction(
  id: string,
  data: Record<string, unknown>
): Promise<ActionResult<ArtworkFull>> {
  try {
    const validation = validateArtworkInput(data);
    if (!validation.success || !validation.data) {
      return { success: false, error: validation.errors.join(', ') };
    }

    const artwork = await updateArtwork(id, validation.data);

    revalidatePath('/');
    revalidatePath('/collections');
    revalidatePath(`/artwork/${artwork.slug}`);

    return { success: true, data: artwork };
  } catch (error) {
    console.error('Update artwork error:', error);
    return { success: false, error: 'Failed to update artwork' };
  }
}

export async function deleteArtworkAction(
  id: string
): Promise<ActionResult> {
  try {
    const artwork = await deleteArtwork(id);

    // Clean up Cloudinary image if it's a Cloudinary URL
    if (artwork.imageUrl.includes('res.cloudinary.com')) {
      const parts = artwork.imageUrl.split('/upload/');
      if (parts[1]) {
        const pathAfterUpload = parts[1].replace(/^v\d+\//, '');
        const publicId = pathAfterUpload.replace(/\.[^.]+$/, '');
        try {
          await deleteImage(publicId);
        } catch (e) {
          console.error('Failed to delete Cloudinary image:', e);
        }
      }
    }

    revalidatePath('/');
    revalidatePath('/collections');

    return { success: true };
  } catch (error) {
    console.error('Delete artwork error:', error);
    return { success: false, error: 'Failed to delete artwork' };
  }
}

export async function togglePublishAction(
  id: string
): Promise<ActionResult<ArtworkFull>> {
  try {
    const artwork = await togglePublish(id);

    revalidatePath('/');
    revalidatePath('/collections');
    revalidatePath(`/artwork/${artwork.slug}`);

    return { success: true, data: artwork };
  } catch (error) {
    console.error('Toggle publish error:', error);
    return { success: false, error: 'Failed to toggle publish status' };
  }
}
