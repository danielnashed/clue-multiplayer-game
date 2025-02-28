FROM centos:7

# Build ARGs
ARG PYTHON_VERSION=3.9.0

WORKDIR /dockermount

RUN yum -y update && yum clean all
# sqlite-devel added as prerequisite for coverage python lib, used by pytest-cov plugin
RUN yum -y install wget gcc openssl-devel bzip2-devel libffi libffi-devel zlib-devel sqlite-devel xz-devel
RUN yum -y groupinstall "Development Tools"

##### Install PostgreSQL 13 client (psql)
RUN yum -y install https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
RUN yum -y install postgresql13

##### Building python 3.x
WORKDIR /usr/src
RUN wget --quiet https://www.python.org/ftp/python/${PYTHON_VERSION}/Python-${PYTHON_VERSION}.tgz
RUN tar xzf Python-${PYTHON_VERSION}.tgz
WORKDIR /usr/src/Python-${PYTHON_VERSION}
RUN ./configure --enable-optimizations
RUN make altinstall
RUN ln -sf /usr/local/bin/python`echo ${PYTHON_VERSION} | awk -F. '{short_version=$1 FS $2; print short_version}'` /usr/bin/python3
RUN echo "$(python3 --version)"

##### Copy python packaged
WORKDIR /srv

##### Copy the rest of the project files into the container
COPY . /srv

#### Install API dependencies
RUN python3 -m pip install -r requirements.txt

##### Ensure Python STDOUT gets sent to container logs
ENV PYTHONUNBUFFERED=1