// API utility functions for wedding invitation app
import { uploadSignature } from '../config/supabase';

const RSVP_API_URL = 'https://68bbbc0b84055bce63f29ffc.mockapi.io/rsvp';
const GUESTBOOK_API_URL = 'https://68bbbc0b84055bce63f29ffc.mockapi.io/guestbook_entries';

// RSVP API functions
export const rsvpAPI = {
  // Get all RSVP entries
  async getAll() {
    try {
      const response = await fetch(RSVP_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching RSVP entries:', error);
      throw error;
    }
  },

  // Create new RSVP entry
  async create(rsvpData) {
    try {
      const response = await fetch(RSVP_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rsvpData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating RSVP entry:', error);
      throw error;
    }
  },

  // Update RSVP entry
  async update(id, rsvpData) {
    try {
      const response = await fetch(`${RSVP_API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rsvpData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating RSVP entry:', error);
      throw error;
    }
  },

  // Delete RSVP entry
  async delete(id) {
    try {
      const response = await fetch(`${RSVP_API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting RSVP entry:', error);
      throw error;
    }
  }
};

// GuestBook API functions
export const guestbookAPI = {
  // Get all guestbook entries
  async getAll() {
    try {
      const response = await fetch(GUESTBOOK_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching guestbook entries:', error);
      throw error;
    }
  },

  // Create new guestbook entry
  async create(entryData) {
    try {
      const response = await fetch(GUESTBOOK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating guestbook entry:', error);
      throw error;
    }
  },

  // Update guestbook entry
  async update(id, entryData) {
    try {
      const response = await fetch(`${GUESTBOOK_API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating guestbook entry:', error);
      throw error;
    }
  },

  // Delete guestbook entry
  async delete(id) {
    try {
      const response = await fetch(`${GUESTBOOK_API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting guestbook entry:', error);
      throw error;
    }
  }
};

// Helper function to format RSVP data for API
export const formatRSVPData = (formData) => {
  return {
    guestName: formData.name,
    email: formData.email,
    attending: formData.attending === 'yes',
    guestCount: parseInt(formData.guests),
    message: formData.dietaryRestrictions || '',
    timestamp: new Date().toISOString()
  };
};

// Helper function to format GuestBook data for API
export const formatGuestBookData = (name, message, signatureUrl) => {
  return {
    author: name,
    message: message,
    timestamp: new Date().toISOString(),
    photoUrl: signatureUrl || ''
  };
};

// Helper function to create guestbook entry with signature upload
export const createGuestBookEntryWithSignature = async (name, message, signatureDataUrl) => {
  try {
    let signatureUrl = '';
    
    // Upload signature to Supabase if provided
    if (signatureDataUrl) {
      const uploadResult = await uploadSignature(signatureDataUrl, name);
      if (uploadResult.success) {
        signatureUrl = uploadResult.url;
      } else if (uploadResult.fallback) {
        // Nếu Supabase chưa được cấu hình, sử dụng base64 string tạm thời
        console.warn('Supabase chưa được cấu hình. Sử dụng base64 string tạm thời.');
        signatureUrl = signatureDataUrl; // Sử dụng base64 string
      } else {
        console.warn('Failed to upload signature:', uploadResult.error);
        // Continue without signature if upload fails
      }
    }
    
    // Format data for API
    const apiData = formatGuestBookData(name, message, signatureUrl);
    
    // Create entry via API
    const response = await guestbookAPI.create(apiData);
    
    return {
      success: true,
      data: response,
      signatureUrl: signatureUrl
    };
    
  } catch (error) {
    console.error('Error creating guestbook entry with signature:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
