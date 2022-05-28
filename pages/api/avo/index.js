import Database from "@database/db"

const avos = async (req, res) => {
    const db = Database
    const data = await db.getAll();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ data, lengthData: data.length });
};

export default avos;