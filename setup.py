import setuptools

setuptools.setup(
    name="looseleaf",
    version="2026.02.18",
    py_modules=["looseleaf"],
    entry_points={"console_scripts": ["looseleaf=looseleaf.__main__:cli"]},
    long_description=open("README.md").read(),
    license=open("LICENSE.md").read(),
)
