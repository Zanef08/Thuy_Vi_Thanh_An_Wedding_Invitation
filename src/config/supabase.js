// Tạm thời comment out Supabase để test
// import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// Bạn cần thay thế các giá trị này bằng thông tin project Supabase của bạn
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

// Tạo Supabase client - tạm thời comment out
// export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabase = null

// Storage bucket name cho chữ ký
export const SIGNATURE_BUCKET = 'signatures'

// Function để upload chữ ký lên Supabase Storage
export const uploadSignature = async (signatureDataUrl, fileName) => {
  try {
    // Tạm thời luôn trả về fallback mode
    console.warn('Supabase tạm thời bị disable. Sử dụng fallback mode.')
    return {
      success: false,
      error: 'Supabase tạm thời bị disable',
      fallback: true
    }

    // Code gốc cho Supabase (đã comment out)
    /*
    // Kiểm tra xem Supabase đã được cấu hình chưa
    if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
      console.warn('Supabase chưa được cấu hình. Sử dụng fallback mode.')
      return {
        success: false,
        error: 'Supabase chưa được cấu hình',
        fallback: true
      }
    }

    // Convert data URL to blob
    const response = await fetch(signatureDataUrl)
    const blob = await response.blob()
    
    // Tạo unique filename
    const timestamp = Date.now()
    const uniqueFileName = `signature_${timestamp}_${fileName || 'signature'}.png`
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(SIGNATURE_BUCKET)
      .upload(uniqueFileName, blob, {
        contentType: 'image/png',
        upsert: false
      })
    
    if (error) {
      throw error
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(SIGNATURE_BUCKET)
      .getPublicUrl(data.path)
    
    return {
      success: true,
      url: urlData.publicUrl,
      path: data.path
    }
    */
    
  } catch (error) {
    console.error('Error uploading signature:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Function để xóa chữ ký khỏi Supabase Storage
export const deleteSignature = async (filePath) => {
  try {
    // Tạm thời return success vì Supabase bị disable
    console.warn('Supabase tạm thời bị disable. Không thể xóa file.')
    return { success: true }
    
    // Code gốc cho Supabase (đã comment out)
    /*
    const { error } = await supabase.storage
      .from(SIGNATURE_BUCKET)
      .remove([filePath])
    
    if (error) {
      throw error
    }
    
    return { success: true }
    */
  } catch (error) {
    console.error('Error deleting signature:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
