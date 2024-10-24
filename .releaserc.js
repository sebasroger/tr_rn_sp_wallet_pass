module.exports = {
  branches: [
    'main',
    {
      name: 'tmp/feature/**',
      channel: 'beta',
      prerelease: 'beta.${name.split(`/`).pop()}',
    },
    {
      name: 'tmp/feat/**',
      channel: 'beta',
      prerelease: 'beta.${name.split(`/`).pop()}',
    },
    {
      name: 'tmp/bugfix/**',
      channel: 'beta',
      prerelease: 'beta.${name.split(`/`).pop()}',
    },
    {
      name: 'tmp/hotfix/**',
      channel: 'beta',
      prerelease: 'beta.${name.split(`/`).pop()}',
    },
    {
      name: 'tmp/documentation/**',
      channel: 'beta',
      prerelease: 'beta.${name.split(`/`).pop()}',
    },
    {
      name: 'tmp/docs/**',
      channel: 'beta',
      prerelease: 'beta.${name.split(`/`).pop()}',
    },
    {
      name: 'tmp/improvement/**',
      channel: 'beta',
      prerelease: 'beta.${name.split(`/`).pop()}',
    },
    {
      name: 'tmp/refactor/**',
      channel: 'beta',
      prerelease: 'beta.${name.split(`/`).pop()}',
    },
    //   {
    //     name: "release/*",
    //     channel: "rc",
    //     prerelease: "rc.${name.split(`/`).pop()}",
    //   },
  ],
};
