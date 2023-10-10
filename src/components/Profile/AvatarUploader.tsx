import React, { useState } from 'react';
import { Avatar, Box } from '@chakra-ui/react';
import { IoMdPersonAdd } from 'react-icons/io';
import { supabase } from '../../supabase';



interface AvatarUploaderProps {
  signedUp: boolean;
  id: string;
}


const AvatarUploader: React.FC<AvatarUploaderProps> = ({ signedUp, id }) => {

  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = `user-avatar-${id}`;
      const { data: existingData } = await supabase.storage.from('profiles').getPublicUrl(fileName);

      if (existingData) {
        // If a file with the same name exists, delete it first
        const { error: deleteError } = await supabase.storage.from('profiles').remove([fileName]);
        setIsUploaded(false);
        if (deleteError) {
          console.error('Error deleting existing avatar:', deleteError);
          return;
        }
      }

      // Then upload the new file
      const { data: uploadData, error: uploadError } = await supabase.storage.from('profiles').upload(fileName, file);

      if (uploadError) {
        console.error('Error uploading avatar:', uploadError);
        return;
      }

      console.log('Avatar updated successfully!', uploadData);
      setIsUploaded(true);
    }
};



  const handleClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  };
  return (
    <Box as="button" onClick={handleClick} cursor="pointer">
      <Avatar size='lg' src={signedUp || isUploaded ? `https://taabyxlbdchdekaofdzv.supabase.co/storage/v1/object/public/profiles/user-avatar-${id}?${Date.now()}` : ''} icon={<IoMdPersonAdd />} />
      <input type="file" accept="image/*" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
    </Box>
  );
};

export default AvatarUploader;
