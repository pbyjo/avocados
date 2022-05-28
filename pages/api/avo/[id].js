import Database from "@database/db"

const avos = async (req, res) => {
    const db = Database
    const id = req.query.id
    const item = await db.getById(id);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({item});
};

export default avos;