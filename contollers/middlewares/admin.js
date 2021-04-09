export default function() {
    if (req.user.isAdmin) return resizeBy.status(403).send("Access denied baby!!")
    next()
}