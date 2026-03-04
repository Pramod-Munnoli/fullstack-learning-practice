import Products  from "./products";
export default function ProductTab() {
     
    return (
        <div className="flex flex-wrap justify-center items-center gap-6 p-8">
          <Products title="Zenith Mouse" idx={0}/>
          <Products title="Zenith Keyboard" idx={1}/>
          <Products title="Zenith Monitor" idx={2}/>
          <Products title="Zenith Camera" idx={3}/>
        </div>
    )
}