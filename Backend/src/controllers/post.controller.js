export async function getPosts(req, res) {}

export async function getPost(req, res) {}

export async function createPost(req, res) {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No media uploaded" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function deletePost(req, res) {}

export async function getUserPosts(req, res) {}
