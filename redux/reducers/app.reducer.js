import actions from "../actions";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // กำหนด case ในกรณีที่ barcode ถูกแสกนสำเร็จ
    case actions.Types.BARCODE_SCANNED: {
      return { ...state, barcodeScanned: payload };
    }

    // เพิ่มการรับ action BARCODE_DATA_LOADED และนำ payload ที่ได้ ใส่เข้าไปใน state ในชื่อของ barcodes
    case actions.Types.BARCODE_DATA_LOADED: {
      // console.log('barcodes arrived', payload);
      return { ...state, barcodes: [...payload] };
    }

    default:
      return state;
  }
};
