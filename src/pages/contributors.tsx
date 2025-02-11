import axios from "axios";
import { useEffect, useState } from "react";
import '../loader.css'
export function Followcard({ name, id, desc, front, back }: any) {
  return (
    <div key={id} className="w-[240px] border rounded-xl shadow-lg bg-white flex flex-col h-[260px]">
      {/* Background Image */}
      <div className="relative h-[90px]">
        <img
          className="object-cover w-full h-full rounded-t-lg"
          src={back || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&s"}
          alt="Cover"
        />
        <img
          className="absolute w-20 h-20 rounded-full left-1/2 transform -translate-x-1/2 -bottom-8 border-4 border-white"
          src={front || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&s"}
          alt="Profile"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center pt-14 px-4 pb-4 text-center">
        <h2 className="font-bold text-lg">{name}</h2>
        <p className="text-slate-500 text-sm line-clamp-2">{desc}</p>
      </div>
    </div>
  );
}

export default function Contributors() {
  const [data, setData] = useState<any[]>([]);
  const [loading,setLoading] = useState(false)
  async function getAllcards() {
    setLoading(true)
    try {
      const contributors = await axios({
        url: "http://localhost:3000/admin/getContributors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userid")}`,
        },
      });
      console.log(contributors.data);
      if (contributors.data) {
        setData(contributors.data.all);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
    finally{setLoading(false)}
  }

  useEffect(() => {
    getAllcards();
  }, []);

  

  return (
    <div className="w-full flex bg-slate-100 py-20  justify-center items-center overflow-hidden">
      <div
        className="sliding-container"
        
      >
        <div className="sliding-track">
        {loading ? <span>Loading...</span>: data.map((each: any) => {
          return (
            <div  key={each.id}>
              <Followcard
                id={each.id}
                name={each.name}
                desc={each.description}
                front={each.profileimg}
                back={each.backimg}
              />
            </div>
          );
        })}
        
        </div>
       
      </div>
    </div>
  );
}
