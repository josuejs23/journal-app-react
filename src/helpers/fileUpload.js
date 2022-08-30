
export const fileUpload = async(file)=>{

    if(!file) throw new Error('File must be provider');

    const cloudURL = 'https://api.cloudinary.com/v1_1/dp51gegpi/upload';

    const formData = new FormData();

    formData.append('upload_preset','react-journal');
    formData.append('file',file);

    try{

        const resp = await fetch(cloudURL, {
            method:'POST',
            body:formData
        });

        console.log(resp);
        if(!resp.ok) throw new Error('Cant upload the image.');

        const cloudResp = await resp.json();
        console.log(cloudResp);

        return cloudResp.secure_url;

    } catch(error){
        console.log(error)
    }
}