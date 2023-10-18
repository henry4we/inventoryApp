import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this poduct.</p>
            )}
          </Card>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Product Category:</label>
          <input
            type="text"
            placeholder="Product Category"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />

          <label>Product Quantity:</label>
          <input
            type="text"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label>Product Price:</label>
          <input
            type="text"
            placeholder="Product Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;

// // Import necessary modules and components.
// // import  Rich text editor component for React
// //  Import styling for ReactQuill editor
// // Custom Card component
// // Import stylesheet for ProductForm
// // Define the ProductForm component

// // Container div for the entire product form.
// // Wrap the form within a Card component for styling.
// // The main product form begins here. The form has an onSubmit handler to save the product when submitted.
// // Create a grouped section within a Card component for the product image.
// // Label to indicate where the user can upload the product image.
// // Informational note about the image formats that are supported.
// // Input field of type 'file' to allow users to select and upload an image.Whenever an image is selected/changed, handleImageChange is called.
// // Conditional rendering to show an image preview if one exists.
// // If imagePreview is not null, display the uploaded image.
// // If no imagePreview exists, display a message indicating no image has been set.

// // Label for the product name input field.
// // Input field for the product name.
// // The value is taken from the 'product' prop and updated via 'handleInputChange'. do same for product name, category, price and quantity
// // Label for the product description input field.
// // Using ReactQuill, a rich text editor, for product description input.
// // The current description value and update function are passed as props, also add  modules={ProductForm.modules}formats={ProductForm.formats}
// // Container div for the submit button with margin styles.(className="--my">)
// // Button to submit the form and save the product details.

// //  Define header styles (H1 and H2) and font family dropdown.
// // Define font size dropdown.
// // Define text styling buttons: bold, italic, underline, strike-through, and blockquote.
// // Define alignment options (e.g., left, center, right, justify).
// // Define text color and background color pickers.
// // Define ordered and unordered list buttons.
// // Define indentation buttons to decrease or increase indent level.
// // Add a 'clean' button to remove any formatting.

// import React from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import Card from "../../card/Card";
// import "./ProductForm.scss";

// const ProductForm = ({
//   product,
//   productImage,
//   imagePreview,
//   description,
//   setDescription,
//   handleInputChange,
//   handleImageChange,
//   saveProduct,
// }) => {
//   return (
//     <div className="add-product ">
//       <Card cardClass={"card"}>
//         <form onSubmit={saveProduct}>
//           <Card cardClass={"group"}>
//             <label>Product Image</label>
//             <code className="--color-dark">
//               Supported Formats: jpg, jpeg, png
//             </code>
//             <input
//               type="file"
//               name="image"
//               onChange={(e) => handleImageChange(e)}
//             />
//             {imagePreview != null ? (
//               <div className="image-preview">
//                 <img src={imagePreview} alt="product" />
//               </div>
//             ) : (
//               <p>No image set for this poduct.</p>
//             )}
//           </Card>
//           <label>Product Name:</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Product name"
//             value={product?.name}
//             onChange={handleInputChange}
//           />
//           <label>Product Category:</label>
//           <input
//             type="text"
//             placeholder="Product category"
//             name="category"
//             value={product?.category}
//             onChange={handleInputChange}
//           />
//           <label>Product Quantity:</label>
//           <input
//             type="text"
//             placeholder="Product quantity"
//             name="quantity"
//             value={product?.quantity}
//             onChange={handleInputChange}
//           />
//           <label>Product Price:</label>
//           <input
//             type="text"
//             placeholder="Product price"
//             name="price"
//             value={product?.price}
//             onChange={handleInputChange}
//           />
//           <label>Product Description:</label>
//           <ReactQuill
//             theme="snow"
//             value={description}
//             onChange={setDescription}
//             modules={ProductForm.modules}
//             formats={ProductForm.formats}
//           />
//           <div className="--my">
//             <button className="--btn --btn-primary">Save Product</button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// };

// ProductForm.modules = {
//   toolbar: [
//     [{ header: "1" }, { header: "2" }, { font: [] }],
//     [{ size: [] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [{ align: [] }],
//     [{ color: [] }, { background: [] }],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["clean"],
//   ],
// };
// ProductForm.formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "color",
//   "background",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "video",
//   "image",
//   "code-block",
//   "align",
// ];

// export default ProductForm;
