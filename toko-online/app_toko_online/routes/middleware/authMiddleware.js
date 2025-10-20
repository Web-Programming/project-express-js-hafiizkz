exports.adminOnly = (req, res, next) => {
    const isAdmin = req.body.isAdmin;
    if (!isAdmin === true) {
        console.log('Middleware: Akses ditolak. Hanya admin yang diperbolehkan.');
        next(); //lanjutkan
    }else{
        //403 forbidden
        return res.status(403).json({
            status: false,
            message: 'Akses ditolak. Endpoint ini membutuhkan hak admin.'
        });
    }
}
