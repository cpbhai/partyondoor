const jwt = require("jsonwebtoken");
const newRoute = {
  redirect: {
    destination: "/",
    permanent: false,
  },
};
export const ProtectedRoute = (token, accessibleBy, path) => {
  newRoute.redirect.destination = path;
  if (!token) return { status: true, newRoute };
  try {
    let data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (data.type === accessibleBy) return { status: false };
    return { status: true, newRoute };
  } catch (err) {
    return { status: true, newRoute };
  }
};
export const RedirectTo = (routeRdr) => {
  newRoute.redirect.destination = routeRdr;
  return newRoute;
};
