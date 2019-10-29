import DBService from "../services/db.service";

// กำหนดชื่อประเภทของ action (เหตุการณ์ต่างๆ) ที่เกิดในระบบและมีผลต่อข้อมูลโดยรวม
const Types = {
  // ใช้ในกรณีที่มีการแสกนบาร์โค้ดเสร็จแล้ว
  BARCODE_SCANNED: "BARCODE_SCANNED",
  BARCODE_DATA_LOADED: "BARCODE_DATA_LOADED"
};

// function สำหรับสร้าง Action object ที่จะส่งเข้า redux store
const barcodeScanned = async (dispatch, barcodeData) => {
  let db = new DBService();
  let rows = await db.saveBarcode(barcodeData);
  dispatch({
    type: Types.BARCODE_DATA_LOADED,
    payload: rows
  });
};

// export เอาไปใช้งาน
export default {
  Types,
  barcodeScanned
};
