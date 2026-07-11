<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SupabaseStorageService
{

    /**
     * Upload image to Supabase images bucket
     */
    public function uploadImage($file, $folder = 'uploads/images')
    {
        $filename = time() . '_' .
            Str::random(10) . '.' .
            $file->getClientOriginalExtension();

        $path = $folder . '/' . $filename;


        Storage::disk('supabase_images')->put(
            $path,
            file_get_contents($file),
            'public'
        );


        return $this->getImageUrl($path);
    }



    /**
     * Upload document to Supabase documents bucket
     */
    public function uploadDocument($file, $folder = 'uploads/documents')
    {
        $filename = time() . '_' .
            Str::random(10) . '.' .
            $file->getClientOriginalExtension();

        $path = $folder . '/' . $filename;


        Storage::disk('supabase_documents')->put(
            $path,
            file_get_contents($file),
            'public'
        );


        return $this->getDocumentUrl($path);
    }



    /**
     * Get public image URL
     */
    public function getImageUrl($path)
    {
        return Storage::disk('supabase_images')
            ->url($path);
    }



    /**
     * Get public document URL
     */
    public function getDocumentUrl($path)
    {
        return Storage::disk('supabase_documents')
            ->url($path);
    }



    /**
     * Delete image from Supabase
     */
    public function deleteImage($url)
    {
        if (!$url) {
            return false;
        }


        $path = $this->extractPath($url);


        if ($path) {

            return Storage::disk('supabase_images')
                ->delete($path);

        }


        return false;
    }



    /**
     * Delete document from Supabase
     */
    public function deleteDocument($url)
    {
        if (!$url) {
            return false;
        }


        $path = $this->extractPath($url);


        if ($path) {

            return Storage::disk('supabase_documents')
                ->delete($path);

        }


        return false;
    }



    /**
     * Extract storage path from Supabase public URL
     */
    private function extractPath($url)
    {
        if (!$url) {
            return null;
        }


        $path = parse_url($url, PHP_URL_PATH);


        if (!$path) {
            return null;
        }




        $parts = explode('/public/', $path);


        if (!isset($parts[1])) {
            return null;
        }


        // remove bucket name from path
        $storagePath = explode('/', $parts[1], 2);


        return $storagePath[1] ?? null;
    }

}
