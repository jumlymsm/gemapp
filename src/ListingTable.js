import React from "react";

function ListingTable({ listings }) {
  if (!listings.length) return null;
  return (
    <div className="overflow-x-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Listings Table</h2>
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Gem Type</th>
            <th className="border px-2 py-1">Color Category</th>
            <th className="border px-2 py-1">Shapes</th>
            <th className="border px-2 py-1">Carat</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Table %</th>
            <th className="border px-2 py-1">Depth %</th>
            <th className="border px-2 py-1">Ratio</th>
            <th className="border px-2 py-1">Clarity</th>
            <th className="border px-2 py-1">Cut</th>
            <th className="border px-2 py-1">Polish</th>
            <th className="border px-2 py-1">Symmetry</th>
            <th className="border px-2 py-1">Certifications</th>
            <th className="border px-2 py-1">Enhancements</th>
            <th className="border px-2 py-1">Comments</th>
            <th className="border px-2 py-1">Contact</th>
            <th className="border px-2 py-1">Images</th>
            <th className="border px-2 py-1">Created At</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((l, idx) => (
            <tr key={idx} className="border-t">
              <td className="border px-2 py-1">{l.gemType}</td>
              <td className="border px-2 py-1">{l.colorCategory}</td>
              <td className="border px-2 py-1">{l.selectedShapes.join(", ")}</td>
              <td className="border px-2 py-1">{l.carat}</td>
              <td className="border px-2 py-1">${l.price}</td>
              <td className="border px-2 py-1">{l.tablePct}</td>
              <td className="border px-2 py-1">{l.depthPct}</td>
              <td className="border px-2 py-1">{l.ratio}</td>
              <td className="border px-2 py-1">{l.clarity}</td>
              <td className="border px-2 py-1">{l.cut}</td>
              <td className="border px-2 py-1">{l.polish}</td>
              <td className="border px-2 py-1">{l.symmetry}</td>
              <td className="border px-2 py-1">{l.certs.join(", ")}</td>
              <td className="border px-2 py-1">{l.enhance.join(", ")}</td>
              <td className="border px-2 py-1">{l.comments}</td>
              <td className="border px-2 py-1">
                {l.contact.name}<br/>{l.contact.phone}<br/>{l.contact.email}
              </td>
              <td className="border px-2 py-1">
                {l.images && l.images.length > 0 && l.images.map((img, i) => (
                  <a key={i} href={img} target="_blank" rel="noopener noreferrer" className="inline-block mr-1">
                    <span className="underline text-blue-600">Image {i+1}</span>
                  </a>
                ))}
              </td>
              <td className="border px-2 py-1">{new Date(l.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListingTable;
