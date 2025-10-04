// import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const transactions = [
  {
    name: "Jaganath S.",
    date: "24.05.2023",
    amount: "$124.97",
    status: "Paid" as const,
  },
  {
    name: "Anand G.",
    date: "23.05.2023",
    amount: "$55.42",
    status: "Pending" as const,
  },
  {
    name: "Kartik S.",
    date: "23.05.2023",
    amount: "$89.90",
    status: "Paid" as const,
  },
  {
    name: "Rakesh S.",
    date: "22.05.2023",
    amount: "$144.94",
    status: "Pending" as const,
  },
  {
    name: "Anup S.",
    date: "22.05.2023",
    amount: "$70.52",
    status: "Paid" as const,
  },
  {
    name: "Jimmy P.",
    date: "22.05.2023",
    amount: "$70.52",
    status: "Paid" as const,
  },
];

const products = [
  {
    name: "Men Grey Hoodie",
    price: "$49.90",
    units: 204,
    image: "/grey-hoodie.png",
  },
  {
    name: "Women Striped T-Shirt",
    price: "$34.90",
    units: 188,
    image: "/striped-tshirt.jpg",
  },
  {
    name: "Women White T-Shirt",
    price: "$40.90",
    units: 120,
    image: "/white-tshirt.png",
  },
  {
    name: "Men White T-Shirt",
    price: "$49.90",
    units: 204,
    image: "/white-mens-tshirt.jpg",
  },
  {
    name: "Women Red T-Shirt",
    price: "$34.90",
    units: 155,
    image: "/red-tshirt.jpg",
  },
];

export default function Todos() {
  return (
    <div className="max-h-screen bg-gray-50 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-sm font-medium text-gray-600 pb-3">
                    Name
                  </th>
                  <th className="text-left text-sm font-medium text-gray-600 pb-3">
                    Date
                  </th>
                  <th className="text-left text-sm font-medium text-gray-600 pb-3">
                    Amount
                  </th>
                  <th className="text-left text-sm font-medium text-gray-600 pb-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-3 text-sm text-gray-900">
                      {transaction.name}
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {transaction.date}
                    </td>
                    <td className="py-3 text-sm text-gray-900">
                      {transaction.amount}
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          transaction.status === "Paid"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          transaction.status === "Paid"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Top Products by Units Sold
          </h2>
          <div className="space-y-1">
            <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 pb-3 border-b border-gray-200">
              <div className="text-sm font-medium text-gray-600"></div>
              <div className="text-sm font-medium text-gray-600">Name</div>
              <div className="text-sm font-medium text-gray-600">Price</div>
              <div className="text-sm font-medium text-gray-600">Units</div>
            </div>
            {products.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto_1fr_auto_auto] gap-4 py-3 items-center border-b border-gray-100 last:border-0"
              >
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      product.image ||
                      "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                    }
                    alt={product.name.at(0)}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="text-sm text-gray-900">{product.name}</div>
                <div className="text-sm text-gray-900">{product.price}</div>
                <div className="text-sm text-gray-600">{product.units}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
