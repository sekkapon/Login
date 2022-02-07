class My_Query {
    get_token = async(data) => {
        /* ดึงข้อมูลจากฐานข้อมูลเพื่อเช็คกับ token ที่ req เข้ามา */
        if (data == 'tokenflowlogin') { /* ถ้า token ที่เก็บในฐานข้อมูลตรงกับ token req จะ return true */
            return true;
        } else { /* ถ้าไม่ตรงกับ token ในฐานข้อมูลจะ return false */
            return false;
        }
    }

    checkLogin = async(data, condition) => { /* data = ข้อมูล username หรือ password , condition = กำหนดเงื่อนไขเช็ค username,password */
        if (condition == 1) { /* เงื่อนไขเช็ค username */
            /* ดึงข้อมูล username จากฐานข้อมูลเพื่อเช็คกับ username req */
            if (data == 'admin') {
                return true;
            } else {
                return false;
            }
        } else { /* เงื่อนไขเช็ค pasword */
            /* ดึงข้อมูล password จากฐานข้อมูลเพื่อเช็คกับ password req */
            if (data == '586e94b87bada0f77c6bdb6fe02d2e1549eb2c04') {
                return true;
            } else {
                return false;
            }
        }
    }

    hasBeenUsed = async(username) => {
        /* เช็คการมีอยู่ของ username จากฐานข้อมูล */
        let countUsernameInDatabase = 0; /* สมมิตค่าขึ้นมา ว่าในฐานข้อมูลยังไม่มี username นี้ */

        if (countUsernameInDatabase == 0) { /* ถ้าไม่มี username นี้ */
            return true;
        } else { /* ถ้ามี username แล้ว */
            return false;
        }
    }

    insertUser = async(data) => {
        console.log(data);
        /* เพิ่มข้อมูลผู่ใช้ในฐานข้อมูล */
        let insertData = 1; /* สมมิตค่าขึ้นมาถ้าเพิ่มข้อมูลสำเร็จให้เป็น 1  */
        if (insertData == 1) {
            return true;
        } else {
            return false;
        }
    }
}
module.exports = My_Query;