import ProductThumb from "../../product-thumb/product-thumb";

export default function NewArrivals() {
  return (
    <>
      <div className="grid grid-cols-2 p-2 lg:p-0 md:grid-cols-4 gap-4">
        <ProductThumb
          image="amd-cpu-9800X3D-pilot"
          alt="Product Image of 9800X3D CPU"
          price={47000}
          title="AMD Ryzen™ 7 9800X3D Desktop Processor"
        />
        <ProductThumb
          image="msi-mobo-megX870E-godlike-pilot"
          alt="Product Image of MSI MEG X870E Godlike Motherboard"
          price={165199}
          title="MSI MEG X870E Godlike X Edition Motherboard"
        />
        <ProductThumb
          image="asus-tuf-5090-pilot"
          alt="Product Image of ASUS TUF RTX 5090"
          price={479000}
          title="ASUS TUF Gaming GeForce RTX 5090 32GB GDDR7 Gaming Graphics Card"
        />
                <ProductThumb
          image="gskill-trident-neo-z5-64-cl30-6000-pilot"
          alt="Product Image of G.Skill Trident Z5 NEO RGB Series"
          price={479000}
          title="G.Skill Trident Z5 NEO RGB Series (AMD Expo) 64GB (2 x 32GB) 288-Pin SDRAM DDR5 6000 CL30-40-40-96 1.40V Dual Channel Desktop Memory"
        />
      </div>
    </>
  );
}
