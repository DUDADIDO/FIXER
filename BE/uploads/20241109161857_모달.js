{isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="w-[700px] bg-white p-8 rounded-lg shadow-lg">
            <button 
              onClick={handleModalClose} 
              className="bg-red-500 text-white px-4 py-2 rounded float-right">
              X
            </button>
            <h3 className="text-lg font-bold mb-4">업체 정보 수정</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">업체명:</label>
              <input
                type="text"
                name="name"
                value={editedStore.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">설명:</label>
              <textarea
                name="description"
                value={editedStore.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="5"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">주소:</label>
              <input
                type="text"
                name="location"
                value={editedStore.location}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">휴대폰 번호:</label>
              <input
                type="text"
                name="phone"
                value={editedStore.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">업체 선택:</label>
              <select
                name="brand"
                value={editedStore.brand || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">업체 선택</option>
                {brandOptions.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">기기 선택:</label>
              <div className="max-h-24 overflow-y-auto border border-gray-300 p-2 rounded">
                {deviceOptions[editedStore.brand]?.map((device) => {
                  const deviceId = `${editedStore.brand}:${device}`;
                  return (
                    <div key={deviceId} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="supported_features"
                        value={deviceId}
                        checked={editedStore.supported_features?.includes(deviceId) || false}
                        onChange={handleInputChange}
                        className="form-checkbox"
                      />
                      <label className="text-gray-700">{device}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">사진 경로:</label>
              <input
                type="text"
                name="logo"
                value={editedStore.logo}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            
            <button
              onClick={handleSaveChanges}
              className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 transition"
            >
              저장
            </button>
          </div>
        </div>
      )}