Records complex knowledge about Java programming language.

# [Java](https://gist.github.com/bndynet/6970816d5e533537c0a969ad8993fcf1)

-------------------------------
## Spring Boot Starter Project

### Two Java Files 

```java
@ConfigurationProperties(prefix = "spring.ftsi")
public class IndexServiceAutoConfigurationProperties {

}

@Configuration
@EnableConfigurationProperties(IndexServiceAutoConfigurationProperties.class)
@ConditionalOnClass(IndexService.class)
@ConditionalOnProperty(prefix = "spring.ftsi", name = "enabled", matchIfMissing = true)
public class IndexServiceAutoConfiguration {

    @Autowired
    private IndexServiceAutoConfigurationProperties properties;

    @Bean
    @ConditionalOnMissingBean(IndexService.class)
    public IndexService indexService() throws ClassNotFoundException, IllegalAccessException, InstantiationException {
        IndexService service = new IndexService();
        return service;
    }
}
```

### File: /src/main/resources/META-INF/spring.factories

```
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
net.bndy.ftsi.starter.IndexServiceAutoConfiguration
```

### Usage

**application.yml**

```
spring:
  ftsi:
    property1: ...
    property2: ...

```

**java**

```java
@SpringBootApplication
public class Application {

	@Autowried
  	IndexService indexService;
  
  	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
  	}
}
```

---
## Aspect

In computing, aspect-oriented programming (AOP) is a programming paradigm that aims to increase modularity by allowing the separation of cross-cutting concerns. 
It does so by adding additional behavior to existing code (an advice) without modifying the code itself, instead separately specifying which code is modified via a "pointcut" specification,
such as "log all function calls when the function's name begins with 'set'". This allows behaviors that are not central to the business logic (such as logging) to be added to a program without cluttering the code,
core to the functionality. AOP forms a basis for aspect-oriented software development.

### Define an Aspect by using @Aspect annotations - which is natively understood by Spring:

```java
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Aspect
public class AuditAspect {

    private static Logger logger = LoggerFactory.getLogger(AuditAspect.class);

    @Pointcut("execution(* net.bndy.service.*.*(..))")
    public void serviceMethods(JoinPoint jp){ }
    
    // Intercept all calls to methods annotated with @PerLog
    // @Pointcut("execution(@net.bndy.annotations.PerfLog * *.*(..))")
    public void performanceTargets(JoinPoint jp, PerLog perLog){ }
    // Pass annotation to AOP advices
    @Pointcut(value = "@annotation(perLog)", argNames = "perfLog")
    public void performanceTargets(JoinPoint jp, PerLog perLog){ }
    
    // Using annotations and parameters in AOP advices
    @Before(value = "com.byteslounge.spring.aop.PointcutDefinition.serviceLayer() && args(account,..) && @annotation(auditable)")
    public void audit(Account account, Auditable auditable) {
        System.out.println("Audit account access: "
            + account.getAccountNumber() + ". Audit destination: "
            + auditable.value());
    }
    
    // If the first parameter is of the JoinPoint, ProceedingJoinPoint, or JoinPoint.StaticPart type, you may leave out the name of the parameter from the value of the "argNames" attribute. For example, if you modify the preceding advice to receive the join point object, the "argNames" attribute need not include it:
    @Before(value="com.xyz.lib.Pointcuts.anyPublicMethod() && target(bean) && @annotation(auditable)", argNames="bean,auditable")
    public void audit(JoinPoint jp, Object bean, Auditable auditable) {
        AuditCode code = auditable.value();
        // ... use code, bean, and jp
    }

    @Before("serviceMethods()")
    public void beforeMethod(JoinPoint jp) {
        String methodName = jp.getSignature().getName();
        logger.info("before method:" + methodName);
    }

    @Around("serviceMethods()")
    public Object aroundMethod(ProceedingJoinPoint jp) {
        try {
            long start = System.nanoTime();
            // execute target method
            Object result = jp.proceed();
            long end = System.nanoTime();
            logger.info(String.format("%s took %d ns", jp.getSignature(), (end - start)));
            return result;
        } catch (Throwable e) {
            throw new RuntimeException(e);
        }
    }
     
    // Always run if method completed
    @After("serviceMethods()")
    public void afterMethod(JoinPoint jp) {
        logger.info("after method");
    }
    
    // Run when the method returns normally.
    @AfterReturning(value="execution(* net.bndy.service.*.*(..))",returning="result")
    public void afterReturningMethod(JoinPoint jp, Object result){ }
    
    // Run if an exception has benn thrown in method
    @AfterThrowing(value="execution(* net.bndy.service.*.*(..))",throwing="e")
    public void afterThorwingMethod(JoinPoint jp, NullPointerException e){ }
}
```

### @Pointcut

```java
//                   Any return type | package          | class | method | any type and number of arguments
@Pointcut("execution(*                 net.bndy.service . *.      *(       ..                                  ))")
@Pointcut("execution(* net.bndy.service.*.*(.. ))")

// examples
@Pointcut("within(*..*Test)")                   // support for sub packages is provided with ".."
@Pointcut("within(net.bndy.service..*Test)")    // ends with Test inside the "net.bndy.service" package
@Pointcut("!within(net.bndy.service..*Test)"    // expects that ends with Test inside the "net.bndy.service" package
@Pointcut("execution(void *..service.Service+.*(..))")  // all methods in the Service class or a subtype of it

@Pointcut("!withincode(@org.junit.Test * *(..))")    //Finds all statements that’s not inside a method marked with @Test

// other Pointcuts
//execution(void Point.setX(int))
//call(void Point.setX(int))
//handler(ArrayOutOfBoundsException)
//this(SomeType)
//target(SomeType)
//within(MyClass)
//cflow(call(void Test.main()))
//call(* *(..)) && (within(Line) || within(Point))
//execution(!static * *(..))
//execution(public !static * *(..))
```

### Why to use argNames

```java
public class HelloApi {

    public void aspectTest(String a,String b){
        System.out.println("in aspectTest:" + "a:" + a + ",b:" + b);
    }
}
```

```java
@Pointcut(value="execution(* bean.HelloApi.aspectTest(..)) && args(a1,b2)",argNames="a1,b2")
public void pointcut1(String a1,String b2){}
    
@Before(value="pointcut1(a,b)",argNames="a,b")
public void beforecase1(String a,String b){
    System.out.println("1 a:" + a +" b:" + b);
}

// NOTE: a and p locations
@Before(value="pointcut1(a,b)",argNames="b,a")
public void beforecase2(String a,String b){
    System.out.println("2 a:" + a +" b:" + b);
}

```

```java
HelloApi helloapi1 = beanFactory.getBean("helloapi1",HelloApi.class);
helloapi1.aspectTest("a", "b");
```

**Output**

```
1 a:a b:b
2 a:b b:a
in aspectTest:a:a,b:b
```

---
## Publishing Repo to Maven Central

### Create an account on oss.sonatype.org
  
  Create an account and create an ISSUE about Repo. And waiting approved.

### Generate and share a PGP signature

  1. Installing GnuPG 
  
    `gpg --version`
    
  1. Generating a Key Pair and Sharing Key
  
    ```
    gpg --generate-key
    gpg --list-keys --keyid-format short
    gpg --list-secret-keys --keyid-format short
    gpg --keyserver hkp://pool.sks-keyservers.net --send-keys <pubkeyid>
    // gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys <pubkeyid>
    ```
    Delete Key or Sub Key
    ```
    gpg2 --edit-key A6BAB25
    gpg> 1 
    gpg> save
    gpg> key 2
    gpg> delkey
    ```

### Local GPG

  1. Add `~/.gradle/gradle.properties` with following content:
  
  ```
  signing.keyId=<pubkeyid>
  signing.password=<passwordGPG>
  // For new version GPG, secring.gpg does not be used.
  // But you can still use `gpg --export-secret-keys >~/.gnupg/secring.gpg` to generate
  // On windows, you can use `C:/Users/<yourname>/.gnupg/secring.gpg` instead.
  signing.secretKeyRingFile=/Users/<yourname>/.gnupg/secring.gpg 
  
  ossrhUsername=<name for oss.sonatype.org>
  ossrhPassword=<password for oss.sonatype.org>
  ```
  
### Project Configuration

  build.gradle example:
  ```
  group 'net.bndy'
  version '1.0'

  apply plugin: 'java'
  apply plugin: 'maven'
  apply plugin: 'signing'


  sourceCompatibility = 1.8

  repositories {
      mavenCentral()
  }

  dependencies {
      testCompile group: 'junit', name: 'junit', version: '4.12'
      compile group: 'com.fasterxml.jackson.core', name: 'jackson-core', version: '2.9.3'
      compile group: 'com.fasterxml.jackson.core', name: 'jackson-databind', version: '2.9.3'
      compile group: 'commons-codec', name: 'commons-codec', version: '1.11'
      compile group: 'javax.mail', name: 'javax.mail-api', version: '1.6.0'
      compile group: 'org.apache.directory.studio', name: 'org.apache.commons.io', version: '2.4'
      compile group: 'javax.servlet', name: 'servlet-api', version: '2.5'
  }

  task javadocJar(type: Jar) {
      classifier = 'javadoc'
      from javadoc
  }

  task sourcesJar(type: Jar) {
      classifier = 'sources'
      from sourceSets.main.allSource
  }

  artifacts {
      archives javadocJar, sourcesJar
  }

  signing {
      sign configurations.archives
  }

  uploadArchives {
      repositories {
          mavenDeployer {
              beforeDeployment { MavenDeployment deployment -> signing.signPom(deployment) }

              repository(url: "https://oss.sonatype.org/service/local/staging/deploy/maven2/") {
                  authentication(userName: ossrhUsername, password: ossrhPassword)
              }

              snapshotRepository(url: "https://oss.sonatype.org/content/repositories/snapshots/") {
                  authentication(userName: ossrhUsername, password: ossrhPassword)
              }

              pom.project {
                  name 'Jlib'
                  packaging 'jar'

                  // optionally artifactId can be defined here
                  description 'A Java Library'
                  url 'https://github.com/bndynet/Jlib'

                  scm {
                      url 'https://github.com/bndynet/Jlib'
                      connection 'scm:git:git://github.com/bndynet/Jlib.git'
                      developerConnection 'scm:git:git@github.com:bndynet/Jlib.git'
                  }

                  licenses {
                      license {
                          name 'The Apache License, Version 2.0'
                          url 'http://www.apache.org/licenses/LICENSE-2.0.txt'
                      }
                  }

                  developers {
                      developer {
                          id 'bndynet'
                          name 'Bendy Zhang'
                          email 'zb@bndy.net'
                          url 'http://bndy.net'
                      }
                  }
              }
          }
      }
  }
  ```
  
### Deployment 

  1. `gradle uploadArchives`
  
  1. Go to `https://oss.sonatype.org/#stagingRepositories` to close your repo. If closed successfully, you can release it. Otherwise, drop it and regradle it again.
