// import React, { useState, useRef } from 'react';
// import CanvasDraw from 'react-canvas-draw';

// const HomePage = () => {
//   const [image, setImage] = useState(null);
//   const [brushRadius, setBrushRadius] = useState(5);
//   const canvasRef = useRef(null);

//   // Handle image upload
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       alert("Please upload a valid JPEG or PNG image.");
//     }
//   };

//   // Export mask
//   const exportMask = () => {
//     if (!canvasRef.current) return;

//     // Get the mask canvas data
//     const canvas = canvasRef.current.canvas.drawing;
//     const ctx = canvas.getContext('2d');

//     // Convert the drawing into a black-and-white mask
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;

//     for (let i = 0; i < data.length; i += 4) {
//       const grayscale = data[i] + data[i + 1] + data[i + 2] > 0 ? 255 : 0;
//       data[i] = grayscale;     // R
//       data[i + 1] = grayscale; // G
//       data[i + 2] = grayscale; // B
//     }
//     ctx.putImageData(imageData, 0, 0);

//     // Save the mask
//     const maskUrl = canvas.toDataURL('image/png');
//     const link = document.createElement('a');
//     link.href = maskUrl;
//     link.download = 'mask.png';
//     link.click();
//   };

//   // Clear canvas
//   const clearCanvas = () => {
//     canvasRef.current.clear();
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Image Inpainting Widget</h1>

//       {/* Image Upload Section */}
//       <div className="mb-4">
//         <label className="block mb-2 font-medium">Upload an Image</label>
//         <input
//           type="file"
//           accept="image/jpeg, image/png"
//           onChange={handleImageUpload}
//           className="border p-2"
//         />
//       </div>

//       {/* Canvas Section */}
//       {image && (
//         <div className="mb-4">
//           <CanvasDraw
//             ref={canvasRef}
//             imgSrc={image}
//             brushColor="white"
//             brushRadius={brushRadius}
//             lazyRadius={1}
//             canvasWidth={600}
//             canvasHeight={400}
//           />

//           {/* Brush Size Controls */}
//           <div className="flex items-center gap-2 mt-2">
//             <label className="font-medium">Brush Size:</label>
//             <input
//               type="range"
//               min="1"
//               max="50"
//               value={brushRadius}
//               onChange={(e) => setBrushRadius(Number(e.target.value))}
//             />
//             <span>{brushRadius}</span>
//           </div>

//           {/* Actions */}
//           <div className="flex gap-4 mt-4">
//             <button
//               onClick={exportMask}
//               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
//             >
//               Export Mask
//             </button>
//             <button
//               onClick={clearCanvas}
//               className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
//             >
//               Clear Canvas
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Display Original Image and Mask */}
//       {image && (
//         <div className="mt-6 flex flex-col gap-4">
//           <h2 className="text-xl font-semibold">Original Image:</h2>
//           <img src={image} alt="Original" className="border w-80" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';

const HomePage = () => {
  const [image, setImage] = useState(null);
  const [brushRadius, setBrushRadius] = useState(5);
  const canvasRef = useRef(null);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid JPEG or PNG image.");
    }
  };

  // Export mask
  const exportMask = () => {
    if (!canvasRef.current) return;

    // Get the mask canvas data
    const canvas = canvasRef.current.canvas.drawing;
    const ctx = canvas.getContext('2d');

    // Convert the drawing into a black-and-white mask
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const grayscale = data[i] + data[i + 1] + data[i + 2] > 0 ? 255 : 0;
      data[i] = grayscale;     // R
      data[i + 1] = grayscale; // G
      data[i + 2] = grayscale; // B
    }
    ctx.putImageData(imageData, 0, 0);

    // Save the mask
    const maskUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = maskUrl;
    link.download = 'mask.png';
    link.click();
  };

  // Clear canvas
  const clearCanvas = () => {
    canvasRef.current.clear();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-600">Image Inpainting Widget</h1>

      {/* Image Upload Section */}
      <div className="mb-6 flex flex-col items-center">
        <label className="block mb-4 text-lg font-medium text-gray-700">Upload an Image</label>
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleImageUpload}
          className="border rounded-lg p-3 bg-white shadow-md"
        />
      </div>

      {/* Canvas Section */}
      {image && (
        <div className="mb-8 max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg">
          <CanvasDraw
            ref={canvasRef}
            imgSrc={image}
            brushColor="white"
            brushRadius={brushRadius}
            lazyRadius={1}
            canvasWidth={600}
            canvasHeight={400}
            className="border-2 border-gray-300"
          />

          {/* Brush Size Controls */}
          <div className="flex items-center gap-3 mt-4">
            <label className="font-medium text-gray-600">Brush Size:</label>
            <input
              type="range"
              min="1"
              max="50"
              value={brushRadius}
              onChange={(e) => setBrushRadius(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-gray-700 font-bold">{brushRadius}</span>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-6">
            <button
              onClick={exportMask}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Export Mask
            </button>
            <button
              onClick={clearCanvas}
              className="bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
            >
              Clear Canvas
            </button>
          </div>
        </div>
      )}

      {/* Display Original Image and Mask */}
      {image && (
        <div className="mt-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Original Image</h2>
          <img src={image} alt="Original" className="border border-gray-300 rounded-lg shadow-md w-80" />
        </div>
      )}
    </div>
  );
};

export default HomePage;