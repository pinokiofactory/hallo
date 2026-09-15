module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/cocktailpeanut/hallo app",
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          xformers: true,
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install gradio==5.34.2 devicetorch hf-xet",
          "{{platform === 'darwin' ? 'pip install eva-decord' : 'pip install decord'}}",
          "uv pip install -r ../requirements.txt",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: 'hf download fudan-generative-ai/hallo --local-dir pretrained_models --exclude="*.md"'
      }
    },
    {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }
  ]
}
